function destroyResizableWidgets(): void {
  $(".snapshotresizable.top").resizable("destroy");
  $(".snapshotresizable.bottom").resizable("destroy");
  $(".snapshotresizable.left").resizable("destroy");
  $(".snapshotresizable.right").resizable("destroy");
}