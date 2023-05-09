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

/**
 * RETURN NEWLY ADDED PAYMENT WITH EXISTING PAYMENTS
 * @param {*} payments Old payments object from payments state
 * @param {*} newPayment Newly added payment object
 * @param {*} categorySlug Newly added payment category slug
 * @returns Payments object with newly added payment
 */
export function getNewPayments(payments, newPayment, categorySlug) {
  if (payments[categorySlug]) {
    return { ...payments, [categorySlug]: [...payments[categorySlug], newPayment] };
  }
  const newPayments = { ...payments, [categorySlug]: [newPayment] };
  return newPayments;
}

/**
 * CALCULATE TOTALS WHEN NEW PAYMENT ADDED
 * @param {*} prevTotals Totals by category Object
 * @param {*} newPayment Newly Added Payment
 * @param {*} categorySlug Newly Added Payment Category Slug
 * @returns Totals With Newly Added Payment Cost
 */
export function getNewTotals(prevTotals, newPayment, categorySlug) {
  //CHECK PAYMENT CATEGORY IS ALREADY EXISTS IN TOTALS OBJECT
  const isInTotals = prevTotals.some((total) => total.slug == categorySlug);
  let newTotals = null;
  if (isInTotals) {
    newTotals = prevTotals.map((total) => {
      if (total.slug == categorySlug) {
        const newTotal = (parseFloat(total.total) + parseFloat(newPayment.amount)).toFixed(2);
        return { ...total, total: newTotal.toString() };
      }
      return total;
    });
  } else {
    newTotals = [...prevTotals, { category_id: newPayment.category_id, slug: categorySlug, total: newPayment.amount }];
  }
  return newTotals;
}

/**
 * CALCULATE NEW TOTALS BY CATEGORY ON PAYMENT DELETE
 * @param {*} prevTotals Totals Object Before Deleting Payment
 * @param {*} categoryID Deleted Category ID
 * @param {*} paymentAmount Deleted Payment Amount
 * @returns New Totals Object Reduced Total By Deleted Payment
 */
export function getNewTotalsOnDelete(prevTotals, categoryID, paymentAmount) {
  const newTotals = prevTotals.map((total) => {
    if (total.category_id == categoryID) {
      const newTotal = (parseFloat(total.total) - parseFloat(paymentAmount)).toFixed(2);
      return { ...total, total: newTotal.toString() };
    }
    return total;
  });
  return newTotals;
}

/**
 * UPDATE PAYMENTS OBJECT ON PAYMENT UPDATE. HANDLE PAYMENT CATEGORY CHANGE
 * @param {*} prevPayments Old Payments Object
 * @param {*} updatedPayment Updated Payment Object
 * @param {*} oldPayment Old Updated Payment Object
 * @param {*} categories All Catgories
 * @param {*} newCategorySlug Updated Payment Category Slusg
 * @returns New payments with updated payment related to payment category
 */
export function getNewPaymentsOnUpdate(prevPayments, updatedPayment, oldPayment, categories, newCategorySlug) {
  //CHECK UPDATED PAYMENT CATEGORY IS SAME AS OLD PAYMENT
  const oldCategorySlug = getCategorySlug(categories, oldPayment.category_id);
  if (newCategorySlug == oldCategorySlug) {
    const newPayments = {
      ...prevPayments,
      [newCategorySlug]: prevPayments[newCategorySlug].map((item) => {
        if (item.id == updatedPayment.id) {
          return updatedPayment;
        }
        return item;
      }),
    };
    return newPayments;
  }
  //IF UPDATED PAYMENT CATEGORY NOT EQUALS OLD PAYMENT CATEGORY
  if (newCategorySlug != oldCategorySlug) {
    //DELETE OLD PAYMENT FROM OLD CATEGORY
    let afterDeletePayment = prevPayments;
    if (prevPayments[oldCategorySlug]) {
      afterDeletePayment = {
        ...prevPayments,
        [oldCategorySlug]: prevPayments[oldCategorySlug].filter((item) => {
          return item.id != oldPayment.id;
        }),
      };
    }
    //ADD UPDATED PAYMENT TO NEW CATEGORY
    if (afterDeletePayment[newCategorySlug]) {
      return { ...afterDeletePayment, [newCategorySlug]: [...afterDeletePayment[newCategorySlug], updatedPayment] };
    } else {
      return { ...afterDeletePayment, [newCategorySlug]: [updatedPayment] };
    }
  }

  return prevPayments;
}

/**
 * UPDATE TOTALS OBJECT ON PAYMENT UPDATE. HANDLE PAYMENT CATEGORY CHANGE TOTALS UPDATE.
 * @param {*} prevTotals Old Totals Object
 * @param {*} updatedPayment Updated Payment Object
 * @param {*} oldPayment Old Updated Payment Object
 * @param {*} categories All Catgories
 * @param {*} newCategorySlug Updated Payment Category Slusg
 * @returns New Totals With Update of amount by category
 */
export function getNewTotalsOnUpdate(prevTotals, updatedPayment, oldPayment, categories, newCategorySlug) {
  const oldCategorySlug = getCategorySlug(categories, oldPayment.category_id);
  //IF OLD PAYMENT CATEGORY MATCHES WITH UPDATED PAYMENT CATEGORY
  if (newCategorySlug == oldCategorySlug) {
    const newTotals = prevTotals.map((total) => {
      if (total.category_id == oldPayment.category_id) {
        const calTotal = parseFloat(total.total) - parseFloat(oldPayment.amount);
        const newTotal = parseFloat(calTotal) + parseFloat(updatedPayment.amount);
        return { ...total, total: newTotal };
      }
      return total;
    });
    return newTotals;
  }
  //IF PAYMENT CATEGORIES NOT MATCH
  if (newCategorySlug != oldCategorySlug) {
    //UPDATED TOTALS WITH OLD PAYMENT CATEGORY
    const updatedTotals = prevTotals.map((total) => {
      if (total.category_id == oldPayment.category_id) {
        const newTotal = parseFloat(total.total) - parseFloat(oldPayment.amount);
        return { ...total, total: newTotal };
      }
      return total;
    });
    //UPDATE TOTAL WITH UPDATED PAYMENT CATEGORY
    //CHECK PAYMENT CATEGORY IS ALREADY EXISTS IN TOTALS OBJECT
    const isInTotals = prevTotals.some((total) => total.slug == newCategorySlug);
    if (isInTotals) {
      const newTotals = updatedTotals.map((total) => {
        if (total.category_id == updatedPayment.category_id) {
          const newTotal = parseFloat(total.total) + parseFloat(updatedPayment.amount);
          return { ...total, total: newTotal };
        }
        return total;
      });
      return newTotals;
    } else {
      return [...updatedTotals, { category_id: updatedPayment.category_id, slug: newCategorySlug, total: updatedPayment.amount }];
    }
  }
}
