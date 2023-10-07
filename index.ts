#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs';
import pc from 'picocolors';
import packageJson from './package.json';

const { log } = console;

const program = new Command();

program.version(packageJson.version).description(`Mahmoud El-Shawa's CV 
👉😎👉 in the terminal 👉😎👉`);

program
  .command('contact')
  .alias('c')
  .description('Contact information')
  .action(() => {
    log(pc.green('Contact information'));
  });

program
  .command('download')
  .alias('d')
  .description('Download CV')
  .action(async () => {
    const res = await fetch('https://shawa.dev/resume.pdf', {
      headers: {
        'Content-Type': 'application/pdf',
      },
    });

    const pdf = await res.arrayBuffer();

    fs.writeFile('resume.pdf', new DataView(pdf), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });

program.parse(process.argv);
