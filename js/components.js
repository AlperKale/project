/**
 * Partial yükleme fonksiyonu
 * @param {string} partialPath - Partial dosyasının yolu
 * @param {string} targetSelector - Partial'ın yerleştirileceği element seçicisi
 * @returns {Promise<void>}
 */
export async function loadPartial(partialPath, targetSelector) {
    try {
        const response = await fetch(partialPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const content = await response.text();
        document.querySelector(targetSelector).innerHTML = content;
    } catch (error) {
        console.error('Partial yüklenirken hata oluştu:', error);
    }
}

/**
 * Tüm partialsları yükle
 * @returns {Promise<void>}
 */
export async function loadAllPartials() {
    try {
        await Promise.all([
            loadPartial('/partials/header.html', '#header-container'),
            loadPartial('/partials/main.html', '#main-container'),
            loadPartial('/partials/footer.html', '#footer-container')
        ]);
        console.log('Tüm partialslar başarıyla yüklendi');
    } catch (error) {
        console.error('Partialslar yüklenirken hata oluştu:', error);
    }
} 