export function getCategorySlug(categories, payment_category_id) {
  const category = categories.filter((category) => {
    return category.id == payment_category_id;
  });

  return category[0].slug;
}

export function getCategoryID(categories, payment_category_id) {
  const category = categories.filter((category) => {
    return category.id == payment_category_id;
  });

  return category[0].id;
}
