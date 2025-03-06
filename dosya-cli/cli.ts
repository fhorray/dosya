#!/usr/bin/env node

import { Command } from 'commander';
import { execa } from 'execa';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

const program = new Command();

program
  .version('1.0.0')
  .description('CLI para instalar a biblioteca Dosya automaticamente');

// Comando para instalar os pacotes
program
  .command('install')
  .description('Instala os componentes e types do @fhorray/dosya')
  .action(async () => {
    console.log(chalk.blue('🚀 Instalando @fhorray/dosya...'));

    try {
      // Executa a instalação do pacote
      await execa('npm', ['install', '@fhorray/dosya']);

      // Cria o arquivo de configuração (caso necessário)
      const projectRoot = process.cwd();
      const dosyaConfigPath = path.join(projectRoot, 'dosya.config.json');

      if (!fs.existsSync(dosyaConfigPath)) {
        fs.writeFileSync(
          dosyaConfigPath,
          JSON.stringify({ theme: 'light', components: 'all' }, null, 2),
        );
        console.log(chalk.green('✅ Arquivo dosya.config.json criado!'));
      }

      console.log(chalk.green('✅ Instalação concluída!'));
    } catch (error) {
      console.error(chalk.red('❌ Erro ao instalar:'), error);
    }
  });

program.parse(process.argv);
