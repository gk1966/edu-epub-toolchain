modelRoot.traverse((child) => {
    if (child.isMesh) {
        // Διόρθωση θεμάτων διαφάνειας
        if (child.material) {
            child.material.depthWrite = true;
            child.material.transparent = true;
            child.material.opacity = Math.max(0.5, child.material.opacity || 0.8);
        }

        const name = child.name;

        // 1. Υδρογόνα (H)
        // Αντιστοίχιση των στοιχείων που ζητήθηκαν (συμπεριλαμβανομένων των Sphere για ασφάλεια)
        if (name.includes('INITIAL_TRANSPARENT_1') || 
            name.includes('INITIAL_TRANSPARENT_2') || 
            name.includes('Text07') || 
            name.includes('Text08') || 
            name.includes('Sphere')) {
            state.meshes['hydrogens'].push(child);
        }
        // 2. Επίπεδο 1 (π.χ. xy)
        else if (name.includes('TRANSPARENT_PARTS_1')) {
            state.meshes['plane1'].push(child);
        }
        // 3. Επίπεδο 2 (π.χ. xz)
        else if (name.includes('TRANSPARENT_PARTS_2')) {
            state.meshes['plane2'].push(child);
        }
        // 4. Δεσμοί π
        else if (name.includes('PART2_')) {
            state.meshes['pi'].push(child);
        }
        // 5. Άξονες
        else if (name.includes('Circle')) {
            state.meshes['axes'].push(child);
        }
        // 6. Περιοχή σ και Λοβοί sp
        // Στο αρχείο δεν υπάρχει αυστηρός γεωμετρικός διαχωρισμός μεταξύ λοβών sp 
        // και του κεντρικού σ δεσμού μέσω των ονομάτων PART1_. Γι' αυτό τα PART1_ 
        // μοιράζονται και στις δύο οντότητες (ώστε να αναδεικνύεται η περιοχή), 
        // ενώ οι κώνοι και οι κύλινδροι δεν "βαφτίζονται" αυθαίρετα αλλά 
        // συμπληρώνουν την εικόνα.
        else if (name.includes('PART1_')) {
            state.meshes['sigma'].push(child);
            state.meshes['lobes'].push(child);
        }
        else if (name.includes('Cone')) {
            state.meshes['lobes'].push(child);
        }
        else if (name.includes('Cylinder')) {
            state.meshes['sigma'].push(child);
        }
    }
});