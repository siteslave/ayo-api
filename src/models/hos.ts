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

  checkHospcode(db: Knex, hospcode: any) {
    return db('opdconfig')
      .select('hospitalcode', 'hospitalname')
      .where('hospitalcode', hospcode)
      .limit(1);
  }

  getDrugProfile(db: Knex, hn: any) {
    return db('drug_profiles')
      .where('hn', hn)  
      .orderBy('vstdate', 'desc');
  }

  checkPatient(db: Knex, hn: any) {
    let sql = `
    select p.hn, p.fname, p.lname, p.cid, o.hospitalcode 
    from patient as p, opdconfig as o 
    where p.hn=?
    group by p.hn
    `;

    return db.raw(sql, [hn]);
  }
}