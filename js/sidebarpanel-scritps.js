window.closeOffcanvas = (id) => {
    const el = document.getElementById(id);
    if (el) {
        const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(el);
        offcanvas.hide();
    }
};