import { ConfigurationTarget, workspace } from "vscode";

/**
 * 深拷贝配置默认值，避免调用方修改返回值时污染实例内的默认值。
 * 用内置 structuredClone 替代 lodash.clonedeep；配置默认值理论上都来自
 * package.json 的 JSON schema，必然可结构化克隆，但 symbol / 函数等
 * 无法克隆的值会抛错，故做一次兜底返回原值。
 */
function cloneValue<V>(value: V): V {
  try {
    return structuredClone(value);
  } catch {
    return value;
  }
}

/**
 * 以字符串下标视角看待配置对象。
 * T 是无约束泛型（调用方传入自己的配置接口），TS 不允许直接用 string 索引，
 * 这里集中做一次转换，避免在各处散落 as any。
 */
function asRecord(target: unknown): Record<string, unknown> {
  return target as Record<string, unknown>;
}

export class Configuration<T> {
  private readonly _defaultValues: T = {} as T;
  private readonly _values: T = {} as T;
  private readonly identifier: string;
  constructor(identifier: string, defaultValues?: T) {
    this.identifier = identifier;
    this._defaultValues = { ...defaultValues } as T;
  }

  configuration() {
    return workspace.getConfiguration(this.identifier);
  }

  /**
   * Return a value from this configuration.
   * @param section — Configuration name, supports dotted names.
   * @param defaultValue — A value should be returned when no value could be found, is undefined.
   * @returns — The value section denotes or the default.
   */
  get<V>(section: string, defaultValue?: V): V | undefined;
  get<V>(section: string, defaultValue?: V): V | undefined {
    const fallback =
      defaultValue ?? (asRecord(this._defaultValues)[section] as V);
    return this.configuration().get<V>(section, fallback);
  }

  /**
   * Get all Configuration values.
   */
  values(): T {
    const values = asRecord({});
    const cfg = this.configuration();
    const defaults = asRecord(this._defaultValues);
    for (const key of Object.keys(cfg)) {
      if (typeof cfg[key] === "function") {
        continue;
      }
      values[key] = cfg.get(key) ?? cloneValue(defaults[key]);
    }
    return values as T;
  }

  /**
   * Update a configuration value. The updated configuration values are persisted.
   * @param section Configuration name, supports dotted names.
   * @param value  The new value.
   * @param target The {@link ConfigurationTarget configuration target} or a boolean value. Defaults to `true`
   *  - If `true` updates {@link ConfigurationTarget.Global Global settings}.
   *  - If `false` updates {@link ConfigurationTarget.Workspace Workspace settings}.
   *  - If `undefined` or `null` updates to {@link ConfigurationTarget.WorkspaceFolder Workspace folder settings} if configuration is resource specific,
   *  otherwise to {@link ConfigurationTarget.Workspace Workspace settings}.
   */
  async update(
    section: string,
    value: any,
    target?: ConfigurationTarget | boolean | null
  ): Promise<void>;

  /**
   * Update configuration values. The updated configuration values are persisted.
   * @param values Configuration names and values, supports dotted names.
   * @param target The {@link ConfigurationTarget configuration target} or a boolean value. Defaults to `true`
   *  - If `true` updates {@link ConfigurationTarget.Global Global settings}.
   *  - If `false` updates {@link ConfigurationTarget.Workspace Workspace settings}.
   *  - If `undefined` or `null` updates to {@link ConfigurationTarget.WorkspaceFolder Workspace folder settings} if configuration is resource specific,
   *   otherwise to {@link ConfigurationTarget.Workspace Workspace settings}.
   */
  async update(
    values: T,
    target?: ConfigurationTarget | boolean | null
  ): Promise<void>;
  async update(
    section: string | T,
    value?: unknown,
    target?: ConfigurationTarget | boolean | null
  ) {
    const values: Record<string, unknown> = {};
    let _target: ConfigurationTarget | boolean | undefined | null;
    if (typeof section === "string") {
      values[section] = value;
      _target = target;
    } else if (typeof section === "object" && section !== null) {
      Object.assign(values, section);
      _target = value as ConfigurationTarget | boolean | null | undefined;
    } else {
      throw new TypeError("error: section must be string or object");
    }

    const cfg = this.configuration();
    const cached = asRecord(this._values);
    await Promise.all(
      Object.keys(values).map((key) =>
        cfg
          .update(key, values[key], _target ?? ConfigurationTarget.Global)
          .then(() => {
            cached[key] = values[key];
          })
      )
    );
  }
}
