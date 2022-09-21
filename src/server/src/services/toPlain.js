const toPlain = res => {
    if (Array.isArray(res)) return res.map(el => el.get({ plain: true }));
    else {
        try {
            return res.get({ plain: true });
        } catch (err) {
            return null;
        }
    }
};

module.exports = toPlain;
