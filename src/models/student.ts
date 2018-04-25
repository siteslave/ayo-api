import * as Knex from 'knex';

export class Student {

  getStudent(db: Knex) {
    return db('students as s')
      .select(
        's.id', 's.first_name', 's.last_name', 's.university',
        'g.name as gender_name', 's.img', 's.email'
      )
      .innerJoin('genders as g', 'g.id', 's.gender_id')
      .limit(10);
  }

  getDetail(db: Knex, id: any) {
    return db('students as s')
      .select(
        's.id', 's.first_name', 's.last_name', 's.university',
        'g.name as gender_name', 's.img', 's.email'
      )
      .innerJoin('genders as g', 'g.id', 's.gender_id')
      .where('s.id', id);
  }

  save(db: Knex, student: any) {
    return db('students')
      .insert(student, 'id');
  }

  update(db: Knex, id: any, student: any) {
    return db('students')
      .update(student)
      .where('id', id);
  }

  delete(db: Knex, id: any) {
    return db('students')
      .where('id', id)
      .del();
  }
}