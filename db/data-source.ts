import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['dist/**/*.entity.js'],
  // migrations: [] //add when production ready
  synchronize: true //set to false when production is ready
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
