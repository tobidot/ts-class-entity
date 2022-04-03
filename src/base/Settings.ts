interface HasSetting {
    settings: { [k: string]: any };
}
interface HasDefaultSetting {
    default_settings: { [k: string]: any };
}
// Setting types
type Settings<INSTANCE extends HasSetting> = INSTANCE["settings"];
type DefaultSettings<CLASS extends HasDefaultSetting> = CLASS["default_settings"];
// Setting keys
type SettingsOptionalKeys<INSTANCE extends HasSetting, CLASS extends HasDefaultSetting>
    = keyof DefaultSettings<CLASS> & keyof Settings<INSTANCE>;
type SettingsRequiredKeys<INSTANCE extends HasSetting, CLASS extends HasDefaultSetting>
    = Exclude<keyof Settings<INSTANCE>, keyof DefaultSettings<CLASS>>;
// the optional roperties
type SettingsOptional<INSTANCE extends HasSetting, CLASS extends HasDefaultSetting> = {
    [P in SettingsOptionalKeys<INSTANCE, CLASS>]?: INSTANCE["settings"][P] | undefined;
};
// the required properties
type SettingsRequired<INSTANCE extends HasSetting, CLASS extends HasDefaultSetting> = {
    [P in SettingsRequiredKeys<INSTANCE, CLASS>]: INSTANCE["settings"][P]
};

/**
 * Declare an settings input type that requires all values from settings property in a class
 * except for the values found in the default_settings 
 */
export type SettingsInput<INSTANCE extends HasSetting, CLASS extends HasDefaultSetting> =
    SettingsRequired<INSTANCE, CLASS>
    & SettingsOptional<INSTANCE, CLASS>;