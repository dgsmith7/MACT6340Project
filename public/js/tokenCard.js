export let tokenCard = `<div class="card m-3 h-100 fadein">
<img src=<%= image %> class="card-img-top" alt="An image of <%= name %> project">

<div class="card-title">
  <p class="h5 m-2">
    <strong>
      <%= name %>
    </strong>
  </p>
  <div class="row">
    <div class="col text-start m-2">
      <%= edition %> of <%= number %>
    </div>
    <div class="col text-end m-2">
      <%= price %> ETH
    </div>
  </div>
</div>
<div class="mb-2">
  <a class="mx-4" href="<%= metadata %>" title="Metadata - opens in new page" target="blank"><svg
      xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-braces" viewBox="0 0 16 16">
      <path
        d="M2.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C3.25 2 2.49 2.759 2.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6zM13.886 7.9v.163c-1.005.103-1.497.616-1.497 1.6v1.798c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.372-.759 2.372-2.352v-1.524c0-1.094.376-1.456 1.49-1.456V7.332c-1.114 0-1.49-.362-1.49-1.456V4.352C13.51 2.759 12.75 2 11.138 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538V6.3c0 .984.492 1.497 1.497 1.6z" />
    </svg></a>
  <a class="mx-4" href="<%= image %>" title="Fullscreen - opens in new page" target="blank"><svg
      xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-fullscreen"
      viewBox="0 0 16 16">
      <path
        d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z" />
    </svg></a>
  <a class="mx-4" href="<%= anim %>" title="Animation - opens in new page" target="blank"><svg
      xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-play" viewBox="0 0 16 16">
      <path
        d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
    </svg></a>
</div>

</div>`;
