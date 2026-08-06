import fs from 'fs';
import path from 'path';
import https from 'https';

const artifactDir = "C:\\Users\\SirBill's\\.gemini\\antigravity\\brain\\ea1e7093-d266-49a3-a64d-7a440f4fe893";
const targetDir = path.resolve('./public/assets');

// Create assets directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy generated files
const generatedFiles = [
  { prefix: 'un_hero_landlocked', dest: 'un_hero_landlocked.jpg' },
  { prefix: 'un_hiroshima', dest: 'un_hiroshima.jpg' },
  { prefix: 'un_security_council_item', dest: 'un_security_council_item.jpg' },
  { prefix: 'un_el_nino', dest: 'un_el_nino.jpg' },
  { prefix: 'un_actnow', dest: 'un_actnow.jpg' },
  { prefix: 'un_peaceful_world', dest: 'un_peaceful_world.jpg' }
];

console.log("Copying generated images from artifact folder...");
try {
  const files = fs.readdirSync(artifactDir);
  for (const mapping of generatedFiles) {
    const matchingFile = files.find(f => f.startsWith(mapping.prefix) && f.endsWith('.jpg'));
    if (matchingFile) {
      const srcPath = path.join(artifactDir, matchingFile);
      const destPath = path.join(targetDir, mapping.dest);
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${matchingFile} -> ${mapping.dest}`);
    } else {
      console.warn(`Could not find generated image for ${mapping.prefix}`);
    }
  }
} catch (err) {
  console.error("Error reading artifact directory:", err.message);
}

// Download list
const downloadList = [
  { name: 'un_student_resources.jpg', url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80' },
  { name: 'un_sdg_10.jpg', url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80' },
  { name: 'un_moon.jpg', url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80' },
  { name: 'un_gum_arabic.jpg', url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80' },
  { name: 'un_fao_fly.jpg', url: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&w=800&q=80' },
  { name: 'un_iom_hope.jpg', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' },
  { name: 'un_iaea_blue_glow.jpg', url: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80' },
  { name: 'un_wfp_food_security.jpg', url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80' },
  { name: 'un_unctad_debt.jpg', url: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80' },
  { name: 'un_what_we_do_peace.jpg', url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80' },
  { name: 'un_sg_selection.jpg', url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80' },
  { name: 'un_spotlight.jpg', url: 'https://images.unsplash.com/photo-1469571486040-af250c558d53?auto=format&fit=crop&w=800&q=80' },
  { name: 'un_climate_change.jpg', url: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80' },
  { name: 'un_essential_un.jpg', url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80' },
  { name: 'un_watch_drowning.jpg', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
  { name: 'un_watch_wenyen.jpg', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80' },
  { name: 'un_watch_museum.jpg', url: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=800&q=80' },
  { name: 'un_podcast_marwala.jpg', url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80' },
  { name: 'un_podcast_awake.jpg', url: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=800&q=80' },
  { name: 'un_pictures_venezuela.jpg', url: 'https://images.unsplash.com/photo-1594897030264-ab7d87efc473?auto=format&fit=crop&w=800&q=80' },
  { name: 'un_pictures_heritage.jpg', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80' }
];

function download(url, dest, callback) {
  const file = fs.createWriteStream(dest);
  https.get(url, function(response) {
    if (response.statusCode === 302 || response.statusCode === 301) {
      download(response.headers.location, dest, callback);
      return;
    }
    response.pipe(file);
    file.on('finish', function() {
      file.close(callback);
    });
  }).on('error', function(err) {
    fs.unlink(dest, () => {});
    if (callback) callback(err.message);
  });
}

console.log("Downloading stock images from Unsplash...");
let downloadedCount = 0;

function downloadNext() {
  if (downloadedCount >= downloadList.length) {
    console.log("All image downloads completed successfully!");
    process.exit(0);
  }
  const item = downloadList[downloadedCount];
  const destPath = path.join(targetDir, item.name);
  console.log(`Downloading ${item.name}...`);
  download(item.url, destPath, function(err) {
    if (err) {
      console.error(`Error downloading ${item.name}:`, err);
    } else {
      console.log(`Downloaded ${item.name} successfully.`);
    }
    downloadedCount++;
    setTimeout(downloadNext, 100);
  });
}

downloadNext();
