// aqui é a configuração do módule-alias
// para encurtar chamadas de import
import * as path from 'path';
import moduleAlias from 'module-alias';

const files = path.resolve(__dirname, '../..');

moduleAlias.addAliases({
    '@public':      path.join(files, 'public'),
    '@src':         path.join(files, 'src'),
    '@controllers': path.join(files, 'src/controllers/'),
    '@database':    path.join(files, 'src/database/'),
    '@routes':      path.join(files, 'src/routes/'),
    '@services':    path.join(files, 'src/services/'),
    '@utils':       path.join(files, 'src/utils/'),
    '@modules':     path.join(files, 'src/app/modules/'),
    '@test':        path.join(files, 'test')
});