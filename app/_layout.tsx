import Provider from '@/provider';
import AppStacks from '@/stacks';
import '../global.css';

export default function RootLayout() {
    return (
        <Provider>
            <AppStacks />
        </Provider>
    );
}
