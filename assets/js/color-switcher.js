// Dynamically updates product image when a color is selected
document.addEventListener('DOMContentLoaded', () => {
    const colorSelectors = document.querySelectorAll('.color-select');

    colorSelectors.forEach(selector => {
        selector.addEventListener('change', function () {
            const selectedColor = this.value;
            const imageBase = this.getAttribute('data-image-base');
            const productDiv = this.closest('.product');
            const imgTag = productDiv.querySelector('.product-image');

            // Convert color to a filename-friendly string
            const colorSlug = selectedColor.replace(/\s+/g, '');

            // Update the image source
            imgTag.src = `${imageBase}${colorSlug}.jpg`;
        });
    });
});