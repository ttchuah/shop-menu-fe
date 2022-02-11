export interface Category {
  ctaText: string;
  eventType: string;
  eventId: string;
  seoText: string;
  childItems?: CategoryGroup[] | Category[];
}
export interface CategoryGroup {
  groupTitle: string;
  childItems?: Category[];
}
export interface Data {
  data: CategoryGroup[] | Category[];
}
