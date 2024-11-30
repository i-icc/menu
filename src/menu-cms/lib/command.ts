export const revert = async (): Promise<void> => {
    await fetch('/api/client/revert', { method: 'POST' });
};

export const save = async (): Promise<void> => {
    await fetch('/api/client/save', { method: 'POST' });
};

export const deploy = async (): Promise<void> => {
    await fetch('/api/github/deploy', { method: 'POST' });
};