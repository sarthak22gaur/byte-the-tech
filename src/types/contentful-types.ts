import * as Contentful from "contentful";

export interface TypeAuthorFields {
    authorName: Contentful.EntryFields.Symbol;
    authorProfleImage: Contentful.Asset;
}

export type TypeAuthor = Contentful.Entry<TypeAuthorFields>;

export interface TypeBlogFields {
    heroImage: Contentful.Asset;
    title: Contentful.EntryFields.Symbol;
    slug: Contentful.EntryFields.Symbol;
    blogDescription: Contentful.EntryFields.Symbol;
    blogContent: Contentful.EntryFields.Text;
    blogTags: Contentful.EntryFields.Symbol[];
    dbSeed: Contentful.EntryFields.Boolean;
    blogAuthor: Contentful.Entry<Record<string, any>>;
}

export type TypeBlog = Contentful.Entry<TypeBlogFields>;