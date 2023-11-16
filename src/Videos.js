export default function renderVideos(videos) {
  return `${videos.map((v) => renderVideo(v)).join("")}`
}

export function renderVideo(vid) {
  return `<div class="col-md-6">
            <figure>
              <iframe
                width="100%"
                height="315px"
                src= ${vid.link}
              >
              </iframe>
              <figcaption><h4>${vid.caption}</h4></figcaption>
            </figure>
          </div>`;
}
