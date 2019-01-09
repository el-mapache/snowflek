const dropletShape = {
  content: '',
  created_at: null,
  permission: '',
  updated_at: null,
  user_id: null,
};

class DropletValidator {
  constructor(droplet) {
    this.droplet = droplet;
  }

  hasContent() {
    return this.droplet.content.length;
  }

  atMaxLength() {
    return this.droplet.content.length <= 300;
  }

  // use moment, check date of most recent droplet, if its today, dont show,
  // the create interface
}

export default (droplet = {}) => {
  return new DropletValidator({...dropletShape, ...droplet});
};
