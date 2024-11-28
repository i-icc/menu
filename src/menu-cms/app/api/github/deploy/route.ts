import { exec } from 'child_process';
import { NextResponse } from 'next/server';

export async function POST(): Promise<Response> {
    return new Promise((resolve) => {
        exec('git add ../menu-client/public; git add ./public; git commit -m "#5 edit sorce";git push', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                resolve(NextResponse.json({ success: false, error: error.message }));
                return;
            }
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
                resolve(NextResponse.json({ success: false, stderr }));
                return;
            }
            resolve(NextResponse.json({ success: true, stdout }));
        });
    });
}
