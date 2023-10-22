import "normalize.css";
import "../css/styles.css";
import * as list from "./events/list";
import * as player from "./events/player";
import * as dom from "./dom";
import { getJSON } from "./api";


// initial page load
let page = 5;
let prevHash = `page=${page}&query=Tuje bhula diya`;

(async () => {
	window.location.hash = prevHash;
})();


dom.search.addEventListener("click", async (e) => {
	e.preventDefault();
	page = 1
	const newHash = `page=${page}&query=${dom.input.value}`;

	if (newHash === prevHash)	return;

	window.location.hash = newHash;
});

dom.loadMore.addEventListener("click", async () => {
	const query = new URLSearchParams(prevHash.substring(1)).get("query");
  window.location.hash = `page=${++page}&query=${query}`;
});

window.addEventListener("hashchange", async () => {
	const newHash = window.location.hash;
	

	if (prevHash === newHash)	return;

	const json = await getJSON(newHash.substring(1));
	console.log(json);

	list.loadTrackList(json);
	prevHash = newHash;
});

dom.playState.addEventListener("click", () => {
	const state = dom.audio.paused;
	player.updatePlaybackState(state);
	player.updatePauseBtn(state);
});

dom.seekbar.addEventListener("input", player.setPlaybackPosition);

dom.audio.addEventListener("timeupdate", () => {
	player.updateElapsedTrackTimeDisplay();
	player.updateSeekbarDisplay();
});

dom.listContainer.addEventListener("click", (e) => {
	const target = e.target as HTMLDivElement;
	const isTrack = target?.classList.contains("list-item");
	const track = isTrack
		? target
		: (target.closest(".list-item") as HTMLDivElement);

	list.playTrack(track);
	player.updatePauseBtn(true);
});
