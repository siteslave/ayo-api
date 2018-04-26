import * as Knex from 'knex';

export class Hos {
  getPatient(db: Knex, cid: any) {
    return db('patient')
      .select('hn', 'fname', 'lname')  
      .where('cid', cid)
      .limit(1);
  }

  getSysConfig(db: Knex) {
    return db('opdconfig')
      .select('hospitalcode', 'hospitalname')
      .limit(1);
  }

  getDrugProfile(db: Knex, hn: any) {
    return db('drug_profiles')
      .where('hn', hn)  
      .orderBy('vstdate', 'desc');
  }

  checkPatient(db: Knex, hn: any) {
    return db('patient')
      .where('hn', hn);
  }
}