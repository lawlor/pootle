# -*- coding: utf-8 -*-
#
# Copyright (C) Pootle contributors.
#
# This file is a part of the Pootle project. It is distributed under the GPL3
# or later license. See the LICENSE file for a copy of the license and the
# AUTHORS file for copyright and authorship information.

import pytest

from django.template import loader

from pootle.core.browser import get_table_headings
from pootle.core.delegate import panels
from pootle_app.panels import ChildrenPanel
from pootle_language.views import LanguageBrowseView


@pytest.mark.django_db
def test_panel_language_table(language0, rf, member):
    request = rf.get('/language0/')
    request.user = member
    view = LanguageBrowseView(
        kwargs=dict(language_code=language0.code))
    view.request = request
    view.object = view.get_object()
    lang_panels = panels.gather(LanguageBrowseView)
    assert lang_panels.keys() == ["children"]
    assert lang_panels["children"] == ChildrenPanel
    panel = ChildrenPanel(view)
    assert panel.panel_name == "children"
    assert (
        panel.cache_key
        == ("panel.%s.%s"
            % (panel.panel_name, view.cache_key)))

    table = {
        'id': view.view_name,
        'fields': panel.table_fields,
        'headings': get_table_headings(panel.table_fields),
        'items': view.items,
        'disabled_items': view.disabled_items}

    assert panel.table == table
    assert panel.get_context_data() == dict(table=table)
    assert (
        panel.content
        == loader.render_to_string(
            panel.template_name, panel.get_context_data()))
