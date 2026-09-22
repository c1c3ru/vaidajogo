import { useTranslation } from 'react-i18next';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Globe } from 'lucide-react';
import { useTexts } from '@/hooks/useTexts';

export function LanguageSelector() {
    const { i18n } = useTranslation();
    const TEXTS = useTexts();

    const languages = [
        { code: 'pt-BR', name: TEXTS.COMMON.LANGUAGE.PT_BR, flag: '🇧🇷' },
        { code: 'en-US', name: TEXTS.COMMON.LANGUAGE.EN_US, flag: '🇺🇸' },
        { code: 'es', name: TEXTS.COMMON.LANGUAGE.ES, flag: '🇪🇸' },
    ];

    const handleLanguageChange = (value: string) => {
        i18n.changeLanguage(value);
    };

    return (
        <Select
            value={i18n.resolvedLanguage ?? i18n.language}
            onValueChange={handleLanguageChange}
        >
            <SelectTrigger className="w-[180px]" aria-label={TEXTS.COMMON.LANGUAGE.LABEL}>
                <Globe className="mr-2 h-4 w-4" aria-hidden="true" />
                <SelectValue placeholder={TEXTS.COMMON.LANGUAGE.LABEL} />
            </SelectTrigger>
            <SelectContent>
                {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center gap-2">
                            <span aria-hidden="true">{lang.flag}</span>
                            <span>{lang.name}</span>
                        </span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
