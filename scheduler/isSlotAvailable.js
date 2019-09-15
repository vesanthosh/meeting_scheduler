// Check whether the slot available for the given meeting
function isSlotAvailable(slots_in_a_day, slot_needed, index) {
    var slotAvailable = false;
    for (let i = 0; i < slot_needed; i++) {
        if (slots_in_a_day[index] == null) {
            slotAvailable = true;
            index = index + 1;
        } else {
            slotAvailable = false;
        }
    }
    return slotAvailable;
}

module.exports = isSlotAvailable;