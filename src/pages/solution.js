import { html, render } from "lit-html";
import { loadData } from "../dataLoader.js";

let isModalOpen = false;
let cartCount = 0;
const MAX_CART_LIMIT = 10;
const APP_CONTAINER = document.getElementById('app');

export const updateUI = async () => {
    const data = await loadData();
    if (APP_CONTAINER) {
        render(renderSolutionPage(data), APP_CONTAINER);
    }
};

const toggleModal = (e) => {
    if (e) e.preventDefault();
    isModalOpen = !isModalOpen;
    updateUI();
};

const updateQuantity = (id, delta) => {
    const input = document.getElementById(`qty-${id}`);
    if (input) {
        let val = parseInt(input.value) || 1;
        let newVal = val + delta;
        if (newVal >= 1 && newVal <= MAX_CART_LIMIT) {
            input.value = newVal;
        }
    }
};

const addToCart = (id, name) => {
    const input = document.getElementById(`qty-${id}`);
    const qtyToAdd = input ? parseInt(input.value) : 1;

    if (cartCount + qtyToAdd > MAX_CART_LIMIT) {
        alert(`Chyba: Prekročili ste limit! V košíku môže byť maximálne ${MAX_CART_LIMIT} ks. Aktuálne máte ${cartCount} ks.`);
        return;
    }

    cartCount += qtyToAdd;
    updateUI();
    alert(`Úspešne pridané: ${qtyToAdd}x ${name}`);
};

const cartWidget = () => html`
    <div class="c-cart-status">
        <div class="c-cart-status__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span class="c-cart-status__badge">${cartCount}</span>
        </div>
        <div class="c-cart-status__text">Košík: <strong>${cartCount} / ${MAX_CART_LIMIT}</strong> ks</div>
    </div>
`;

const secretOfferModal = () => html`
    <div class="c-modal ${isModalOpen ? 'is-open' : ''}" @click=${toggleModal}>
        <div class="c-modal__content" @click=${(e) => e.stopPropagation()}>
            <button class="c-modal__close" @click=${toggleModal}>&times;</button>
            <div class="c-modal__header">
                <h2 class="c-modal__title">Tajná ponuka produktov Dewalt len pre vás</h2>
                <span class="c-modal__required-label">* povinné polia</span>
            </div>
            <form class="c-form" @submit=${(e) => { e.preventDefault(); alert('Ponuka odoslaná!'); toggleModal(); }}>
                <div class="c-form__group">
                    <label class="c-form__label">E-mail <span class="required">*</span></label>
                    <input type="email" class="c-form__input" required placeholder="matus.kovac@gmail.com">
                </div>
                <div class="c-form__row">
                    <div class="c-form__group">
                        <label class="c-form__label">Meno a priezvisko <span class="required">*</span></label>
                        <input type="text" class="c-form__input" required placeholder="Meno Priezvisko">
                    </div>
                    <div class="c-form__group">
                        <label class="c-form__label">Telefónne číslo (mobil) <span class="required">*</span></label>
                        <input type="tel" class="c-form__input" value="+421" required>
                    </div>
                </div>
                <div class="c-form__group">
                    <label class="c-form__label">Odkiaľ ste sa o tejto ponuke dozvedeli? <span class="required">*</span></label>
                    <select class="c-form__select" required>
                        <option value="web">Priamo z vášho webu</option>
                        <option value="social">Sociálne siete</option>
                    </select>
                </div>
                <div class="c-form__footer">
                    <button type="submit" class="c-button c-button--submit">Získať tajnú ponuku →</button>
                    <p class="c-form__disclaimer">Odoslaním formuláru súhlasíte so <a href="#">spracovaním osobných údajov</a></p>
                </div>
            </form>
        </div>
    </div>
`;

const productCard = (id, name, price, imgPath, code, oldPrice, rating, ratingCount, discount, isNew, vatPrice, showActions) => html`
    <article class="c-product-card">
        <div class="c-product-card__header">
            <div class="c-product-card__badges">
                ${discount ? html`<span class="c-badge c-badge--discount">${discount}</span>` : ""}
                ${isNew ? html`<span class="c-badge c-badge--new">Novinka</span>` : ""}
            </div>
            ${showActions ? html`
                <div class="c-product-card__actions">
                    <button class="c-icon-button"><img src="src/assets/images/compare.png" width="32" height="32" /></button>
                    <button class="c-icon-button"><img src="src/assets/images/heart.png" width="32" height="32" /></button>
                </div>
            ` : ""}
        </div>
        <div class="c-product-card__image-wrapper">
            <img src="${imgPath}" alt="${name}" class="c-product-card__img" />
        </div>
        <div class="c-product-card__content">
            <div class="c-product-card__rating"><span class="c-stars">${rating}</span><span class="c-rating-count">(${ratingCount})</span></div>
            <h3 class="c-product-card__title">${name}</h3>
            <p class="c-product-card__sku">${code}</p>
            <div class="c-product-card__prices">
                ${oldPrice ? html`<div class="c-product-card__price-old">${oldPrice} €</div>` : ""}
                <div class="c-product-card__price-main">${price} €</div>
                <div class="c-product-card__price-vat">${vatPrice} € bez DPH</div>
            </div>
        </div>
        <div class="c-product-card__footer">
            <div class="c-stepper">
                <button class="c-stepper__btn" @click=${() => updateQuantity(id, -1)}>−</button>
                <input type="text" id="qty-${id}" class="c-stepper__input" value="1" readonly />
                <button class="c-stepper__btn" @click=${() => updateQuantity(id, 1)}>+</button>
            </div>
            <button class="c-button c-button--cart" @click=${() => addToCart(id, name)}>Do košíka</button>
        </div>
    </article>
`;

/**
 * MAIN PAGE TEMPLATE
 */
export const renderSolutionPage = (data) => {
    if (!data) return html`Loading...`;
  return html`
        <div class="l-solution">
            ${secretOfferModal()}

            <div class="l-container" style="display: flex; justify-content: flex-end; padding: 2rem 2.4rem;">
                ${cartWidget()}
            </div>

            <div class="l-solution__banner">
                <div class="l-container">
                    ${data.banner ? html`
                        <div class="c-solution-banner">
                            <div class="c-solution-banner__image" style="background-image: url('src/assets/images/main-banner.jpg')"></div>
                            <div class="c-solution-banner__content">
                                <h1 class="c-solution-banner__content__title">${data.banner.title}</h1>
                                <div class="c-solution-banner__content__description">${data.banner.description}</div>
                                <button class="c-solution-banner__content__button"><span>${data.banner.ctaText} →</span></button>
                            </div>
                        </div>` : ""}
                </div>
            </div>

            <div class="l-solution__content">
                <div class="l-container">
                    <div class="c-solution-content">
                        <div class="c-solution-content__cta">
                            ${data.ctaBanner ? html`
                                <div class="c-solution-cta">
                                    <div class="c-solution-cta__image" style="background-image: url('src/assets/images/mystery-offer.jpg')"></div>
                                    <div class="c-solution-cta__content">
                                        <h2 class="c-solution-cta__content__title">${data.ctaBanner.title}</h2>
                                        <p class="c-solution-cta__content__description">${data.ctaBanner.description}</p>
                                        <button class="c-solution-cta__content__button" @click=${toggleModal}><span>${data.ctaBanner.ctaText} →</span></button>
                                    </div>
                                </div>` : ""}
                        </div>
                        <div class="c-solution-content__products">
                            ${productCard("1", "Dewalt Pro 700 Max", "268,10", "src/assets/images/drill1.png", "DHP453RFE", "278", "★★★★☆", "18", "-27%", true, "255,70", true)}
                            ${productCard("2", "Metabo 600 Heavy tools", "129,80", "src/assets/images/drill2.png", "DHP453RFE", "139", "★★★★☆", "17", "-43%", false, "108,40", false)}
                        </div>
                    </div>
                </div>
            </div>

            <div class="l-solution__categories">
                <div class="l-solution__categories-inner">
                    <h2 class="c-section-title">Top kategórie produktov</h2>
                    <div class="c-solution-categories">
                        <div class="c-solution-categories__item c-solution-categories__item--1" style="background-image: url('src/assets/images/power_tools.jpg')">
                            <div class="c-category-box">
                                <div class="c-category-box__header"><h2>Elektrické náradie</h2><span class="c-badge-count">12</span></div>
                                <ul class="c-category-box__list"><li>Elektrické vŕtačky</li><li>Elektrické skrutkovače</li><li>Elektrické vrtáky</li></ul>
                                <a href="#" class="c-category-box__link">Všetky kategórie →</a>
                            </div>
                        </div>

                        <div class="c-solution-categories__item c-solution-categories__item--2" style="background-image: url('src/assets/images/garden_tools.jpg')">
                            <div class="c-category-box">
                                <div class="c-category-box__header"><h2>Záhrada a Les</h2><span class="c-badge-count">45</span></div>
                                <ul class="c-category-box__list">
                                    <li>Náradie pre prácu v lese</li><li>Záhradné kosačky</li><li>Reťazové píly</li>
                                    <li>Záhradné traktory</li><li>Nožnice na trávu</li><li>Zastrihávač kríkov</li>
                                </ul>
                                <a href="#" class="c-category-box__link">Všetky kategórie →</a>
                            </div>
                        </div>

                        <div class="c-solution-categories__item c-solution-categories__item--3" style="background-image: url('src/assets/images/accesories_main.png')">
                            <div class="c-category-box">
                                <div class="c-category-box__header"><h2>Príslušenstvo</h2><span class="c-badge-count">35</span></div>
                                <ul class="c-category-box__list" style="grid-template-columns: 1fr;">
                                    <li>Kľúče</li><li>Kladivá</li><li>Skrutkovače</li><li>Metre</li><li>Lasery</li><li>Okuliare</li><li>Brúsne papiere</li><li>Rezné kotúče</li><li>Vysokotlakové čističe</li>
                                </ul>
                                <a href="#" class="c-category-box__link">Všetky kategórie →</a>
                            </div>
                        </div>

                        <div class="c-solution-categories__item c-solution-categories__item--4" style="background-image: url('src/assets/images/cleaning_tools.jpg')">
                            <div class="c-category-box">
                                <div class="c-category-box__header"><h2>Čistenie a upratovanie</h2><span class="c-badge-count">66</span></div>
                                <ul class="c-category-box__list">
                                    <li>Zametače a metly</li><li>Vedrá a mop systémy</li><li>Čističky vzduchu</li>
                                    <li>Vysávače a príslušenstvo</li><li>Čističe na okná</li><li>Čistiace kefy a hubky</li>
                                </ul>
                                <a href="#" class="c-category-box__link">Všetky kategórie →</a>
                            </div>
                        </div>

                        <div class="c-solution-categories__item c-solution-categories__item--5" style="background-image: url('src/assets/images/handle_tools.jpg')">
                            <div class="c-category-box">
                                <div class="c-category-box__header"><h2>Ručné náradie</h2><span class="c-badge-count">18</span></div>
                                <ul class="c-category-box__list"><li>Gola sady</li><li>Sady ručného náradia</li><li>Meranie a značenie</li></ul>
                                <a href="#" class="c-category-box__link">Všetky kategórie →</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

updateUI();

export const loadAndRenderSolutionPage = async () => {
    try {
        const data = await loadData();
        return renderSolutionPage(data);
    } catch (error) {
        return html`<div class="l-solution">Error loading data: ${error.message}</div>`;
    }
};