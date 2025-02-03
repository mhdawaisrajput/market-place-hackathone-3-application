import { type SchemaTypeDefinition } from 'sanity'
import author from "./author";
import category from "./category";
import post from "./post";
import blockContent from "./blockContent";
import code from "./code";
import product from "./product";
import car from "./cars";
import shipment_related from './shipment_related';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, category, post, blockContent, code, product, car, shipment_related],
}
