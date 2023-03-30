import { galleryItems } from './gallery-items.js';

const gallery = document.querySelector(`.gallery`);
console.log(gallery);

function markupGallery(galleryItems) {
    const markup = galleryItems.map(({ preview, original, description }) => 
`<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    )
    .join("");
  return markup; 
};

gallery.innerHTML = markupGallery(galleryItems);

gallery.addEventListener('click', onClickFoto)

function onClickFoto(event) {
    event.preventDefault();   

    if(!event.target.classList.contains(`gallery__image`)){
        return;
    }
  //console.log(event.target)
  const currentCard = event.target.closest(`.gallery__image`);
 //console.log(currentCard)
  const originalCard = event.target.dataset.source; 
  
  const instance = basicLightbox.create(`
  <img style="border-radius: 4%"  src="${originalCard}">`,
    
    {
      onShow: () => {
        window.addEventListener('keydown', onEsc);
      },
      onClose: () => {
        window.removeEventListener('keydown', onEsc);
      },
    },
  );

  const onEsc = (event) => {
    console.dir(event)
    console.log(event.key);
    if (event.key === 'Escape') {
      instance.close();
    }
  };
  
  instance.show();
}

console.log(galleryItems);

 /*galleryList.insertAdjacentHTML("beforeend", markupGallery(galleryItems));*/





