type ItemProps = {
  titulo: string;
  descricao: string;
  link: string;
};

export const itensNav: ItemProps[] = [
  {
    titulo: 'Cursos',
    descricao:
      'Possibilita o cadastramento e acesso os cursos ativos e inativos da instituição de ensino, além da relação e comparação dos PPCs que as representam.',
    link: '/cursos',
  },
  {
    titulo: 'Área do Conhecimento',
    descricao:
      'Apresenta o campo de cadastramento e acesso as áreas de conhecimento da instituição de ensino, além da relação de disciplinas e versões ligadas a ela.',
    link: '/areas',
  },
  {
    titulo: 'Disciplina',
    descricao:
      'Possibilita o cadastramento e acesso as Disciplinas com suas respectivas versões, além do detalhamento do PPC em que a versão está inserida.',
    link: '/disciplinas',
  },
  {
    titulo: 'Versão da Disciplina',
    descricao:
      'Possibilita o cadastramento e acesso a todas as versões de todas as diciplinas da instituição de ensino, além de poder compara-las entre si.',
    link: '/versoes',
  },
  {
    titulo: 'Autores',
    descricao:
      'Possibilita o cadastramento e acesso de autores que contém obras nos PPCS, além de poder filtrar as aboras por seus respectivos autores. ',
    link: '/autores',
  },
  {
    titulo: 'Obras',
    descricao:
      'Apresenta o cadastramaneto e acesso as obras relacionadas ao curso e disciplina, assim como a possibilidade de adicionar seus autores.',
    link: '/obras',
  },
];
