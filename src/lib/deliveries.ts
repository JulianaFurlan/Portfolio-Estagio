import { deliveryCategories, type DeliveryFile, type DeliveryItem } from '../data/content';

export type ResolvedDeliveryRef = {
  item: DeliveryItem;
  file: DeliveryFile;
};

/** Localiza o arquivo de uma entrega a partir da categoria + slug (id do item). */
export function findDeliveryFile(category: string, slug: string): ResolvedDeliveryRef | null {
  const found = deliveryCategories.find((c) => c.id === category || c.slug === category);
  if (!found) return null;

  const item = found.items.find((i) => i.id === slug);
  if (!item) return null;

  const file = item.files.find((f) => f.kind === 'image' || f.kind === 'pdf');
  if (!file) return null;

  return { item, file };
}
