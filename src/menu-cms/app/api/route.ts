import { exec } from 'child_process';
import { NextResponse } from 'next/server';

export async function GET(): Promise<Response> {
    return new Promise((resolve) => {
        exec('echo HelloWorld', (error, stdout, stderr) => {
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
            resolve(NextResponse.json({ success: true, output: stdout }));
        });
    });
}
