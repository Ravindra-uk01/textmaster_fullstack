import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

export const validType = (role, fields)=> {
    return fields.includes(role);
}

export const generateUniqueSlug = async(title, Thread) => {

    const baseSlug = slugify(title, { lower: true });
    const uniqueId = uuidv4();
    let newSlug = `${baseSlug}-${uniqueId}`;

    while(await Thread.exists({slug : newSlug})){
        const newId = uuidv4();
        newSlug = `${baseSlug}-${newId}`;
    }

    return newSlug;
}

