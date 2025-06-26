import { View } from 'react-native';
import SettingRow from '@/components/settings/SettingRow';
import ButtonSwitchLanguage from '@/components/settings/ButtonSwitchLanguage';
import ButtonSwitchTheme from '@/components/settings/ButtonSwitchTheme';

export default function Settings() {
    return (
        <View className="flex-1 ">
            <SettingRow disabled title="common.language" renderRight={() => <ButtonSwitchLanguage />} />
            <SettingRow disabled title="common.theme" renderRight={() => <ButtonSwitchTheme />} />
        </View>
    );
}
