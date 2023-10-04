// modulo para usar sqlite con expo y hacer consultas
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('sqlite.db');

export const createDatabase = () => {

  // Crear la tabla de Participantes
  db.transaction((tx) => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS Participants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        last_name TEXT,
        email TEXT,
        phone_number TEXT,
        event_date DATE
      );
    `);
  });

  // Crear la tabla de Congresos
  db.transaction((tx) => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS Congresses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        congress_name TEXT UNIQUE,
        description TEXT,
        start_date DATE,
        end_date DATE
      );
    `);
  });

  // Crear la tabla Intermedia (Asistencia)
  db.transaction((tx) => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS Attendance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        participant_id INTEGER,
        congress_id INTEGER,
        FOREIGN KEY (participant_id) REFERENCES Participants (id),
        FOREIGN KEY (congress_id) REFERENCES Congresses (id)
      );
    `);
  });

  console.log("Database created");
}

export const insertCongresses = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO Congresses (congress_name, description, start_date, end_date) VALUES (?, ?, ?, ?)',
    ['Conferencia sobre Desarrollo Ágil 2023', 'Una conferencia enfocada en las metodologías de desarrollo ágil y las mejores prácticas.', '2023-11-10', '2023-11-12'],
    (_, results) => {
      const rowsAffected = results.rowsAffected;
      if (rowsAffected > 0) {
        console.log('Congresses inserted');
      } else {
        console.log('Congresses not inserted');
      }
    });
  });

  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO Congresses (congress_name, description, start_date, end_date) VALUES (?, ?, ?, ?)',
    ['Congreso Internacional de Ingeniería de Software 2023', 'Un congreso anual que reúne a expertos en ingeniería de software de todo el mundo.', '2023-11-10', '2023-11-12'],
    (_, results) => {
      const rowsAffected = results.rowsAffected;
      if (rowsAffected > 0) {
        console.log('Congresses inserted');
      } else {
        console.log('Congresses not inserted');
      }
    });
  });
  console.log("Congresses inserted");
}


export const insertParticipant = (participant, callback) => {
  db.transaction((tx) => {
    tx.executeSql(`
      INSERT INTO Participants (name, last_name, email, phone_number, event_date)
      VALUES (?, ?, ?, ?, ?);
    `, [
      participant.name, 
      participant.last_name, 
      participant.email, 
      participant.phone_number, 
      participant.event_date
    ],
    (_, result) => {
      const id = result.insertId;
      console.log('Participant inserted with id: ', id);
      callback(id);
    },
    (_, error) => {
      console.error('Error :', error);
    });
  });
}

export const insertAttendance = (participantId, congressId) => {
  console.log(participantId, congressId);
  db.transaction((tx) => {
    tx.executeSql(`
      INSERT INTO Attendance (participant_id, congress_id)
      VALUES (?, ?);
    `, [
      participantId, 
      congressId
    ],
    (_, result) => {
      const id = result.insertId;
      console.log('Attendance inserted with id: ', id);
    },
    (_, error) => {
      console.error('Error :', error);
    });
  });
}

export const getCongresses = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT congress_name AS label, id AS value FROM Congresses;',
      [],
      (_, { rows }) => {
        callback(rows._array);
      },
      (error) => {
        console.log(error);
      }
    );
  });
}

export const getAllCongresses = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM Congresses;',
      [],
      (_, { rows }) => {
        callback(rows._array);
      },
      (error) => {
        console.log(error);
      }
    );
  });
}


export const getParticipants = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM Participants;',
      [],
      (_, { rows }) => {
        callback(rows._array);
      },
      (error) => {
        console.log(error);
      }
    );
  });
}

export const getCongressesByParticipant = (searchValue, callback) => {
  db.transaction((tx) => {
    tx.executeSql(`
      SELECT C.*, P.id AS participant_id
      FROM Congresses C
      JOIN Attendance A ON C.id = A.congress_id
      JOIN Participants P ON A.participant_id = P.id
      WHERE P.name LIKE ? OR P.last_name LIKE ? OR P.email LIKE ?;`,
      [searchValue, searchValue, searchValue],
      (_, { rows }) => {
        callback(rows._array);
      },
      (error) => {
        console.log(error);
      }
    );
  });
}

export const getParticipantsByCongress = (congressId, callback) => {
  db.transaction((tx) => {
    tx.executeSql(`
      SELECT P.* 
      FROM Participants P
      JOIN Attendance A ON P.id = A.participant_id
      WHERE A.congress_id = ?;`,
      [congressId],
      (_, { rows }) => {
        callback(rows._array);
        console.log(congressId);
      },
      (error) => {
        console.error('Error al consultar la base de datos:', error);
      }
    );
  });
};

export const removeAttendanceToCongress = (participantId, congressId, callback) => {
  db.transaction((tx) => {
    tx.executeSql(`
      DELETE FROM Attendance
      WHERE participant_id = ? AND congress_id = ?;`,
      [participantId, congressId],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          callback(true);
        } else {
          callback(false);
        }
      },
      (error) => {
        console.log(error);
        callback(false);
      }
    );
  });
};
