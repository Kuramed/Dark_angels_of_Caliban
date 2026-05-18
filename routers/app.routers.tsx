// src/services/api.ts
const getDb = () => {
    const dbStr = localStorage.getItem('cursos_db_local');
    if (dbStr) return JSON.parse(dbStr);
    
    const initialDb = {
        usuarios: [], categorias: [], cursos: [], 
        modulos: [], aulas: [], trilhas: [], 
        planos: [], matriculas: [], avaliacoes: []
    };
    localStorage.setItem('cursos_db_local', JSON.stringify(initialDb));
    return initialDb;
};

const saveDb = (db: any) => localStorage.setItem('cursos_db_local', JSON.stringify(db));
const generateId = () => Math.random().toString(36).substring(2, 10);

const idKeys: Record<string, string> = {
    usuarios: 'id_usuario', categorias: 'id_categoria', cursos: 'id_curso',
    modulos: 'id_modulo', aulas: 'id_aula', trilhas: 'id_trilha',
    planos: 'id_plano', matriculas: 'id_matricula', avaliacoes: 'id_avaliacao'
};

export const apiFetch = async (endpoint: string, options?: RequestInit) => {
    const db = getDb();
    const method = options?.method || 'GET';
    
    const [path, query] = endpoint.split('?');
    const parts = path.split('/').filter(Boolean); 
    const table = parts[0]; 
    const id = parts[1];    

    if (!db[table]) db[table] = [];
    const idKey = idKeys[table] || 'id';

    await new Promise(res => setTimeout(res, 100));

    if (method === 'GET') {
        if (id) {
            return db[table].find((item: any) => item[idKey] === id || item.id === id);
        }
        if (query) {
            const [key, val] = query.split('=');
            return db[table].filter((item: any) => item[key] == val);
        }
        return db[table];
    }

    if (method === 'POST') {
        const newItem = JSON.parse(options?.body as string);
        const newId = generateId();
        newItem[idKey] = newId;
        newItem.id = newId;
        
        db[table].push(newItem);
        saveDb(db);
        return newItem;
    }

    if (method === 'PUT') {
        const updatedItem = JSON.parse(options?.body as string);
        const index = db[table].findIndex((item: any) => item[idKey] === id || item.id === id);
        if (index !== -1) {
            db[table][index] = { ...db[table][index], ...updatedItem };
            saveDb(db);
            return db[table][index];
        }
    }

    if (method === 'DELETE') {
        db[table] = db[table].filter((item: any) => item[idKey] !== id && item.id !== id);
        saveDb(db);
        return null;
    }

    throw new Error(`Método ${method} não suportado.`);
};