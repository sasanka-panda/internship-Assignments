// Token and URl for access the artist's details
const token =
  "BQB9m5ttGJ8SuQJ5Yl8goUCVPOA9PZOutYRdoEpimfqqruGhM-Z753-f2EEM62WTcwn9NdzQNMWRHGnVutfmT4qbbZnhbteETYfZ-_g109ZMglAOvgngJD0PH8xmgrGrPgz90G0vaTHPPNNeKNadUGoiNtgjbEBH5P4ncEnKFxMhtx20TpqhtxscK7MtXeri2eqwoFbvj-SUUGkEIZnl-khaZiHrNAWZEq_-XGh7jk0OyM6RkbNaij-ZvCAh-hKKCePdQuO8ROtvPTE273HicZTS";
const url =
  "https://api.spotify.com/v1/artists?ids=7uIbLdzzSEqnX0Pkrb56cR%2C4YRxDV8wJFPHPTeXepOstw%2C1dVygo6tRFXC8CSWURQJq2%2C3eDT9fwXKuHWFvgZaaYC5v%2C0oOet2f43PA68X5RxKobEy%2C6CXEwIaXYfVJ84biCxqc9k&include_groups=album,single";

  // Verify the Token

async function fetchData(apiUrl) {
  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status !== 200) {
    throw new Error(`Server Error: ${response.statusText}`);
  }
  return response.json();
}

async function getData() {
  try {
    const data = await fetchData(url);
    const artistList = document.getElementById("artist-list");

    await Promise.all(
      data.artists.map(async (artist) => {
        const artistCard = document.createElement("div");
        artistCard.classList.add("artist-card");

        const artistImage = document.createElement("img");
        artistImage.src = artist.images[0].url;

        const artistName = document.createElement("div");
        artistName.classList.add("artist-name");
        artistName.textContent = artist.name;

        const artistGenres = document.createElement("div");
        artistGenres.classList.add("artist-genres");
        artistGenres.textContent = artist.genres.join(", ");

        // Fetch the artist's albums

        const albumsData = await fetchData(
          `https://api.spotify.com/v1/artists/${artist.id}/albums?include_groups=album,single`
        );

        const albums = albumsData.items;

        // Display all albums and artist details

        if (albums.length > 0) {
          const artistAlbums = document.createElement("div");
          artistAlbums.classList.add("artist-albums");

          albums.forEach((album) => {
            const albumName = document.createElement("div");
            albumName.textContent = album.name;

            artistAlbums.appendChild(albumName);
          });

          artistCard.appendChild(artistImage);
          artistCard.appendChild(artistName);
          artistCard.appendChild(artistGenres);
          artistCard.appendChild(artistAlbums);
          artistList.appendChild(artistCard);
        } else {
          artistCard.appendChild(artistImage);
          artistCard.appendChild(artistName);
          artistCard.appendChild(artistGenres);
          artistList.appendChild(artistCard);
        }
      })
    );
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

getData();
