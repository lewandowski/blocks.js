/**
 * Handles the history
 */
function History(blocks)
{
    var self = this;
    this.historySize = 30;

    this.blocks = blocks;
    this.history = [];
    this.historyPos = 0;
    this.ctrlDown = false;
    
    $(document).keydown(function(evt) {
        if (evt.keyCode == 17) {
            self.ctrlDown = true;
        } 

        // Ctrl+Z
        if (evt.keyCode == 90 && self.ctrlDown) {
            self.restoreLast();
        }
    });

    $(document).keyup(function(evt) {
        if (evt.keyCode == 17) {
            self.ctrlDown = false;
        }
    });
};

/**
 * Save the current situation to the history
 */
History.prototype.save = function()
{
    this.history.push(this.blocks.exportData());

    if (this.history.length > this.historySize) {
        this.history.shift();
    }
};

/**
 * Restores the last saved situation
 */
History.prototype.restoreLast = function()
{
    if (this.history.length) {
        var last = this.history.pop();
        this.blocks.importData(last);
    } else {
        alert('Nothing to get');
    }
};
