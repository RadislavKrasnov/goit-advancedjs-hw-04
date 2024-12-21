import{a as l,i as c,S as d}from"./assets/vendor-B6jJ9_I0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const m="47642330-01773e177615e156ed5ec02c5";l.defaults.baseURL="https://pixabay.com/api/";const u=async r=>{try{return(await l.get("/",{params:{key:m,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true"}})).data}catch(t){console.error(t)}},p=r=>`
        <li class="image-card">
            <a href="${r.largeImageURL}" target="_blank">
                <img src="${r.webformatURL}" alt="${r.tags}" loading="lazy" />
                <div class="image-info">
                    <p><b>Likes</b> ${r.likes}</p>
                    <p><b>Views</b> ${r.views}</p>
                    <p><b>Comments</b> ${r.comments}</p>
                    <p><b>Downloads</b> ${r.downloads}</p>
                </div>
            </a>
        </li>
    `,f=r=>{const t=document.querySelector(".gallery");t.innerHTML="";const o=r.map(p).join("");t.insertAdjacentHTML("beforeend",o)},h=document.querySelector("#search-bar-form"),n=document.querySelector(".loader"),y=async r=>{r.preventDefault();try{const a=r.target.elements.search.value;if(a.trim().length===0)return;n.classList.add("is-active");const e=await u(a);(!e.hits||!e.hits.length)&&c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),f(e.hits);var t=new d(".gallery a",{captionsData:"alt",captionDelay:250});t.refresh(),n.classList.remove("is-active")}catch(o){console.error(o),c.error({message:o.message,position:"topRight"}),n.classList.remove("is-active")}};h.addEventListener("submit",y);
//# sourceMappingURL=index.js.map
