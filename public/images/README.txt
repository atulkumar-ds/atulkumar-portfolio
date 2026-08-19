PROJECT SCREENSHOTS
===================

Anything you drop in this folder is served from /images/<filename>.

Nothing here is required for the site to work. Galleries that have no images
render nothing at all rather than showing an empty frame, so the site never
displays a visible placeholder to a recruiter.

WHAT WOULD IMPROVE THE SITE MOST, IN ORDER
------------------------------------------

1. Image captioning example outputs
   Run the V2 Streamlit app, upload 3-6 photos, screenshot each result.
   Save as: caption-v2-1.jpg, caption-v2-2.jpg, ...
   Then add to `examples` in src/data/projects.js:

       examples: [
         { image: '/images/caption-v2-1.jpg',
           caption: 'the caption the model produced',
           version: 'V2' },
       ]

   Same-image V1 and V2 pairs would be the strongest possible addition,
   because they make the whole V1 -> V2 story visible instead of described.

2. Streamlit UI screenshot for the captioning app
3. Startup dashboard screenshots (Overall Analysis and Investor views)
4. V1 training curves - these already exist in your repository at
   Image-Captioning/V1_Baseline_CNN_LSTM/plots/accuracy.png and loss.png

Keep images under ~300 KB each. Use .jpg for photographs, .png for UI.
