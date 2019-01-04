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
}

export default (droplet = {}) => {
  return new DropletValidator({...dropletShape, ...droplet});
};
