export interface ArticleModel {
    title: string;
    date: Date;
    brief: string;
    images: ImageModel[];
    authors: AuthorModel[];
    tables: TableModel[];
}


export interface ImageModel {
    title: string;
    url: string;
}


export interface AuthorModel {
    name: string;
    email: string;
}

export interface TableModel {
    title: string;
}