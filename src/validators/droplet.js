import moment from 'moment';

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

  dropletForToday() {
    const { created_at } = this.droplet;
    let dropletExists = false;

    if (!created_at) {
      return dropletExists;
    }

    if (!moment().diff(created_at, 'days')) {
      dropletExists = true;
    }

    return dropletExists;
  }
}

export default (droplet = {}) => {
  return new DropletValidator({...dropletShape, ...droplet});
};
