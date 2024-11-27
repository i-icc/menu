import { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // シェルコマンドを実行
      const { stdout, stderr } = await exec('pwd');

      if (stderr) {
        console.error(stderr);
        res.status(500).json({ error: 'コマンドの実行に失敗しました' });
        return;
      }

      res.status(200).json({ output: stdout });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'コマンドの実行に失敗しました' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}