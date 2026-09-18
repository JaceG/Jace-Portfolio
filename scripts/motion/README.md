# Additive portfolio motion preview

Keep the portfolio's existing structure, text, typography, sections, and interactions. The approved scope is artwork behind, over, or beside existing content. Do not redesign the page to accommodate the artwork.

Run the existing development server, then open `/?motion=1`. The ordinary URL keeps the current portfolio appearance. The preview is disabled in production. The fixed Motion control toggles all additions and has no layout footprint. Pause stops the added films and settles the added content entrances; it does not alter the original hero interactions. Reduced-motion preferences start the preview paused and disable content choreography. Films pause when offscreen or the document is hidden and fall back to posters if playback fails.

`src/components/hero/index.js` only imports and mounts `film.js` between the existing glow and grid. `film.module.css` positions and masks the video without changing any existing hero styles. The film passes pointer events through to the original interactions.

`hero-artwork.json` records the Higgsfield generation and its prompt. The eight-second source was edited into a quiet forward/reverse loop and compressed to about 848 KiB. The poster is about 52 KiB. Both are served from `public/motion`.

`section-ribbon.json` records a second successful Seedance 2.5 generation. Its eight-second source becomes a silent, 16-second forward/reverse loop (about 547 KiB plus a 33 KiB poster). The ribbon was an earlier boundary study and is now superseded by the five custom section films. A cropped version of the hero film still sits beside Work Experience. Light areas use an inverted, low-opacity composite. Both assets are ordinary video, with no runtime 3D renderer or CSS-generated artwork animation.

`src/components/motion-preview` contains the shared controls, decorative film layers, and JavaScript Web Animations choreography. Existing elements receive `data-motion` attributes for heading reveals, the project arrow, staggered cards/books, résumé rows, and contact fields. There are no new content wrappers, font changes, reordered sections, or copy edits. The provider emits no DOM wrapper, preserving the original sticky introduction and fixed drag-portrait SVG. Pointer hover lifts the existing inner project sheet by seven pixels while its frame remains in place.

Content animation is opt-in and progressive: base markup is visible, pausing/disabling cancels every added animation, keyboard focus settles its containing content, and a mutation observer handles paginated cards/books. Stable book identifiers prevent previously viewed covers from replaying after category pagination. Film layers are decorative and pass pointer events through. Only nearby film elements mount, and offscreen films stop decoding.

`work-montage.js` is an unused native Higgsedit study made from the site's real project screenshots. Its output is retained in `artifacts/motion-study`; it is not part of the portfolio layout.

Browser checks at desktop and 393px: existing section, heading, card, and form dimensions/offsets match with added motion on/off; document width equals viewport width; Pause freezes video timestamps; offscreen hero playback stops; project pagination adds cards; book pagination adds covers; contact fields accept typing. No contact message was submitted. Scoped ESLint reports no errors (the pre-existing Projects effect dependency warning remains).

The production build compiled and generated all routes successfully, exiting 0. Its integrated lint step still reports the repository's existing ESLint parser serialization error; the separate scoped ESLint run above is the relevant lint result for these changes. No deployment was performed.


## Custom Seedance section films

The user selected custom Seedance artwork tied to each section. The Figma examples inform the scale of the transitions, not the subject matter. Literal reference foliage and the screenshot-based transition experiment have been removed.

`section-films.json` records five successful `seedance_2_5` jobs, their full prompts, returned source URLs, and delivery paths. The batch estimate was 162.5 Higgsfield credits. All five outputs completed. They are silent 1280×720 H.264 films, about five seconds each, totaling 6.56 MB. Every frame is independently seekable for native scroll scrubbing. Dark background levels are normalized for compositing.

- GitHub: branching paper tracks join and open out.
- Projects: large modular frames assemble and sweep past the viewer.
- Résumé: a continuous accordion of paper unfolds into a path.
- Books: an open book expands into a turning-page passage.
- Connect: two strokes join into a continuous loop, then unfurl.

`scene-transitions.js` uses each existing section's measured boundary to seek its film. The player is fixed below the header and has no layout footprint. It loads only nearby films. Screen blending removes the black backdrop on green sections; an inverted multiply treatment supplies dark artwork for the white GitHub and Books sections. These are generated video frames, not CSS-drawn shapes or runtime 3D objects.

The Replay control runs the nearest section's film over 3.6 seconds. Pause, Off, reduced-motion mode, Escape, keyboard focus in content, and a hidden document clear the overlay. Direct hash links and existing navigation land without an added transition. Missing or unavailable films leave the original page visible. No scroll interception, added spacers, content reordering, or new section copy.

Current validation: all five completed media files have valid H.264 streams and no audio; scoped ESLint has zero errors, with only the existing Projects dependency warning. The production build compiled and generated all seven pages, exiting zero, while again reporting the existing integrated ESLint parser serialization issue. The initial batch was subsequently reviewed by the user, who requested a more immersive, section-by-section revision starting at the end of ME.


## ME exit: hardware into software

The current focused revision replaces only the GitHub-entry artwork. `me-journey.json` records the successful 10-second, 1080p Seedance 2.5 generation (90-credit estimate). The camera moves between oversized keyboard keys and computer internals, through a monitor into layered software windows, and exits through a white opening onto the original GitHub section. This illustrates the biography's PC-building to software-development story.

The film uses normal full-opacity compositing. It has a 180svh scroll interval between ME and GitHub, added only while motion is enabled, unpaused, and the film has loaded. It enters from the bottom after the final biography paragraph and clears as GitHub reaches the header. Existing section dimensions, content, and order are unchanged; the added interval intentionally lengthens this transition. Off, Pause, reduced-motion mode, and media failure remove the interval. The ordinary and production URLs retain their original flow.

Desktop delivery is 1920×1080, 10.02 MB; the phone version is a 608×1080 central crop, 3.47 MB. Both are silent H.264 at 24fps with keyframes every three frames. A breakpoint change reloads the appropriate crop. The internal replay event previews the complete journey over nine seconds; the current visible control returns to the intro so the new monitor reveal is easy to review.

Verified in the browser: desktop entry after the last biography paragraph, full-frame hardware and software stages, the final reveal of the unchanged GitHub section, a complete replay returning to idle, and Pause removing both the overlay and scroll interval. ME, GitHub, and Projects retained their original desktop widths and heights. At 393×852 the portrait asset loaded, the overlay measured 393×788 below the 64px header, and native scrolling advanced its film time; the browser's responsive screenshot capture was unreliable, so a full visual phone signoff is still outstanding. The temporary viewport override was reset. Scoped lint passes with no errors.

## Hero entrance to ME: behind the monitor

The latest direction keeps the existing hardware study and makes the hero the actual live screen inside a recognizable monitor. The opening scroll pulls back to expose an illustrated bezel, green power button, and complete stand. The hero and casing then travel upward together. A separate, full-viewport Seedance layer beneath them carries giant computer parts downward around the sides and lower edge, clearing into the original ME section. The layer is over the page and under the monitor, with a transparent center and background. All content, typography, and section geometry remain intact; this entrance uses the existing 2.4-viewport intro pin interval.

`hardware-reveal.json` records the completed eight-second Seedance 2.5 generation and its 72-credit estimate. `encode-hardware-reveal.mjs` removes the backing color, cleans edge spill, and encodes a 1600×900 silent VP9 alpha film with a keyframe every three frames. `monitor-casing.json` records the built-in image generation prompt and measured transparent screen opening. The original hero is live DOM within that opening, including its original interactions. The casing is a raster illustration, and component motion is baked into the Seedance film; there is no runtime 3D scene.

`hardware-reveal.js` seeks a hidden decoder from native scroll position and presents completed frames on a persistent transparent canvas. It copies each frame atomically before starting another seek, so the displayed artwork cannot blank while the decoder moves. Direct ME links wait for the correct first frame rather than briefly showing the opening frame. It responds in both directions, passes all pointer events through, and hides outside the intro interval. Pause/Off/reduced motion remove the added layers. Hero pullback is enabled only after the first correct frame and casing have loaded, with the original fade behavior as fallback. The visible Intro ↑ control returns to the top only on a user click.

The original hero scroll-end auto-snap was removed. Its 260ms settle timer repeatedly pulled short wheel gestures back to the same anchor, making scrolling feel stuck. Scroll-driven visual effects remain, without automatic scroll position changes. Verified in desktop Chrome: a 1227.5px ME anchor position advances to 1309.5px after a small wheel gesture and remains there after waiting; reverse scrolling seeks backward; the monitor and live content align during the pullback; the monitor exits above the viewport while hardware falls; the overlay clears completely into ME; Pause removes the film and casing; no horizontal overflow. Scoped lint passes. The production build compiled and generated all seven pages, exiting zero; its integrated lint step continues to report the previously known parser serialization issue. The preview server was restarted after the build.

Follow-up: the user subsequently reported the original Chrome tab still would not wheel-scroll, and the embedded browser flickered during video seeking. The persistent-canvas renderer above replaces direct video presentation. Internal-browser checks show visible retained frames advancing in both directions. The fixed hero now uses `overflow: clip`, avoiding an extra scroll container. The remaining Chrome report is not yet signed off: controls were blocked by an open extension panel while examining the original tab, and the user was asked to close that panel so verification can continue. The previous successful checks on another Chrome preview tab do not establish that this original-tab issue is resolved.

The live screen retains the original static, scanlines, rolling CRT band, and text glitching during pullback. A black layer inside the same transformed screen gradually dims all of those layers between 24% and 60% of the hero exit, leaving a fully black display while the casing is still visible. Internal-browser checks confirmed the static, intermediate dimming, and black screen stages; scoped lint passed.

## Projects entrance and section breathing room

The Projects entrance now composites the site's actual screenshots over the existing Seedance Projects film. Large framed screenshots advance through the center and sweep outward along both sides as the reader scrolls, then clear for the original Projects heading and cards. The artwork is rendered on a 2D canvas; CSS only places and clips the stage. The underlying Seedance video is reused, with completed decoder frames retained while seeking. There is no new billable generation or runtime 3D model.

`/api/projects?all=1` includes the `image` already used by the cards. `project-passage.js` reads that full catalog, including projects beyond the first page. Adding, removing, reordering, or replacing a project's screenshot in the usual project definition updates the transition on the next page load; no separate montage, asset list, keyframes, or exported video needs updating. Panels preserve screenshot proportions. Unavailable screenshots are skipped. The cache loads nearby waves, evicts old panels, and draws at most six at once. Its scroll length grows with the catalog within a capped range. `project-flight.test.mjs` verifies catalog parity, inclusion through catalog growth to 1,000 entries, bounded rendering work, reverse scrolling, and a clear exit.

All five section boundaries now have their own decorative scroll interval with `clamp(160px, 32svh, 360px)` of clear space before and after. The older films are clipped to their measured track, so they cannot cover the neighboring section's content. The ME exit reserves its interval when motion starts, rather than inserting it later when video finishes loading; nearby media loading observes the track itself. The screenshot passage uses a sticky stage within its own interval and continues its final outward sweep as that stage leaves. Pause, Off, and reduced-motion mode remove the stages and spacing. Ordinary and production views keep the original flow.

Internal-browser validation: full-size screenshots on desktop and at 393×852, reverse scrolling, all 21 current catalog entries available to the animation, clear reading buffers, clean exit, and Pause removing every interval. A pre-existing 2px mobile overflow from the résumé row entrance remains unrelated to the clipped Projects canvas. The ordinary paused layout has no horizontal overflow. Scoped lint and the catalog/choreography checks pass.

The production build compiled successfully, generated all seven pages, and exited zero. Next's integrated lint step still reports the existing parser serialization error; separate scoped ESLint passes. The preview server was restarted after the build. The approved monitor work is checkpointed locally in `cfd3213`; this subsequent Projects and spacing iteration remains uncommitted for review. Nothing was pushed.
