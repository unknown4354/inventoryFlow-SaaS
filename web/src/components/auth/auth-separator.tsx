export function AuthSeparator() {
    return (
        <div className="flex w-full items-center justify-center">
            <div className="bg-gray-300 dark:bg-gray-700 h-px w-full" />
            <span className="text-gray-500 dark:text-gray-400 px-2 text-xs">OR</span>
            <div className="bg-gray-300 dark:bg-gray-700 h-px w-full" />
        </div>
    );
}
