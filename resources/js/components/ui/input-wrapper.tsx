import { Label } from './label';

export function InputWrapper({
    inputFor,
    error,
    label,
    children,
}: {
    inputFor: string;
    error?: string;
    label?: string;
    children: React.ReactElement;
}) {
    return (
        <div className="flex flex-col space-y-1.5">
            {Boolean(label) && <Label htmlFor={inputFor}>{label}</Label>}
            {children}
            {Boolean(error) && (
                <p className={'text-xs font-semibold text-red-600'}>{error}</p>
            )}
        </div>
    );
}
