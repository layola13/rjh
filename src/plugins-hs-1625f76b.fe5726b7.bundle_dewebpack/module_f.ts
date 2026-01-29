if (iterator && iterator.return !== null) {
  try {
    iterator.return();
  } catch (error) {
    if (shouldThrow) {
      throw error;
    }
  }
}